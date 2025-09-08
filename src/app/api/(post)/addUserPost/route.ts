import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { Readable } from "stream";
import { IncomingMessage } from "http";
import { getDataFromToken } from "@/helper/getDataFromToken";
import PostModel from "@/models/Post";
import { string, success } from "zod";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";


export const runtime = "nodejs";

function toIncomingMessage(req: Request, body: Buffer): IncomingMessage {
    const stream = Readable.from(body);
    // @ts-ignore
    stream.headers = Object.fromEntries(req.headers); // Mock headers
    // @ts-ignore
    stream.method = req.method;
    return stream as unknown as IncomingMessage;
}

export async function POST(req: NextRequest) {
    await dbConnect()
    try {
        const author: any = await getDataFromToken(req)
        const arrayBuffer = await req.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        console.log("user id ", author)
        if (!author) {
            return NextResponse.json({ success: false, message: "User not Logged in" }, { status: 401 })
        }

        const user = await UserModel.findById(author)
        if (!user) {
            return NextResponse.json({ success: false, message: "Invalid User" }, { status: 401 })
        }

        const uploadDir = path.join(process.cwd(), "public/uploads");
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

        const form = formidable({
            multiples: false,
            uploadDir: uploadDir,
            keepExtensions: true,
            maxFileSize: 200 * 1024 * 1024, // 200MB
        });


        return await new Promise((resolve, reject) => {
            form.parse(toIncomingMessage(req, buffer), async (err, fields: any, files: any) => {
                if (err) return reject(NextResponse.json({ error: err.message }, { status: 500 }));


                const content = Array.isArray(fields.content) ? fields.content[0] : fields.content || "";
                const file = Array.isArray(files.file) ? files.file[0] : files.file;

                // console.log("file is ", file)  // undefined

                if (!file) {
                    const newPost = new PostModel({
                        content,
                        createdBy: author
                    })
                    await newPost.save()

                    return resolve(NextResponse.json({ success: true, message: "Only content Post" }, { status: 201 }))
                }

                if (file) {
                    const mimeType = (file.mimetype || "").toLowerCase();
                    let postData: any = { createdBy:author, content };

                    if (mimeType.startsWith("image/")) {
                        postData.post_image = `/uploads/${file.newFilename}`;
                        postData.post_video = ""
                    } else if (mimeType.startsWith("video/")) {
                        postData.post_video = `/uploads/${file.newFilename}`;
                         postData.post_image=""
                    } else {
                        return resolve(NextResponse.json({ error: "Unsupported file type" }, { status: 400 }));
                    }

                    const newPostAdded = await PostModel.create(postData);
                    if (!newPostAdded) {
                        return resolve(NextResponse.json({ success: false, message: "Problem to Add Post" }, { status: 501 }))
                    }

                    const post = await PostModel.findById(newPostAdded._id)


                    resolve(
                        NextResponse.json({
                            success: true,
                            data: post,
                            message: "File uploaded successfully",
                        })
                    );
                }


            });
        });




    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
