import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {InputLabel, MenuItem, Select} from "@mui/material";
import {TopicChooser} from "@/components/containers/TopicChooser";
import jwt from "jsonwebtoken";
import prisma from "@/utils/prisma";
import {Summary} from "@/components/containers/Summary";

export default async function Home() {
    const allCookies = cookies()
    const token = allCookies.get("token")?.value
    if (!token) {
        return redirect("/auth/signin")
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {id: string}
    const userId = payload.id
    const quizzes = (await prisma.quiz.findMany({
        where: {
            userId: userId
        }
    })).map((quiz)=>{
        return {
            id: quiz.id,
            topic: quiz.topic,
            score: quiz.score || 0,
            createdAt: quiz.createdAt
        }
    })
    return <>
        <TopicChooser />
    <Summary quizzes={quizzes} />
    </>
}
