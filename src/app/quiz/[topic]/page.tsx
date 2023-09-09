
import {OpenAI} from 'openai';
import {cookies} from "next/headers";
import prisma from "@/utils/prisma";
import {Attempt} from "@prisma/client";
import jwt from "jsonwebtoken";
import {Quiz} from "@/components/containers/Quiz";
import {redirect} from "next/navigation";
const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY!
})
const generateQuestions = async (topicString: string) => {
    const systemMessage = "You are a function that generates exactly 10 questions from a topic. You should return a stringified json of the result. getQuestions(topic: String): { question: string, optionA: string, optionB: string, optionC: string, optionD: string, answer: 'A' | 'B' |'C'|'D' }[]";
    const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
            {
                role: 'system',
                content: systemMessage
            }, {
                role: 'user',
                content: `getQuestions("${topicString}")`
            }
        ]
    });
    console.log(response.choices[0].message.content)
    return response.choices[0].message.content
}
export default async function Page({params}: { params: { topic: string } }) {
    const {topic} = params;
    const questions=  await generateQuestions(topic)
    if(!questions) return <></>
    const questionsJSON = JSON.parse(questions) as Attempt[]
    const token = cookies().get("token")?.value
    if (!token) {
        return redirect("/auth/signin")
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {id: string}
    const userId = payload.id
    const res = await prisma.quiz.create({
        data: {
            topic: topic,
            questions: questionsJSON,
            userId: userId
        }
    })
    const quizProps = questionsJSON.map((q)=>{return {...q, answer: undefined}})
    return <Quiz quizId={res.id} questions={quizProps} ></Quiz>
}