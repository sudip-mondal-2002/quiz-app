import {NextRequest, NextResponse} from "next/server";
import {getUser} from "@/utils/getUser";
import prisma from "@/utils/prisma";
import {Option} from ".prisma/client";
import {NotFoundError} from "@/errors/NotFoundError";

type Params = {
    quizid: string
}
export const POST = async (req: NextRequest, {params}: {params: Params}) => {
    const user = await getUser(req)
    if(!user){
        throw new Error("You are not logged in")
    }
    const body: {question: string, answer: Option}[] = await req.json()
    const {quizid} = params
    const attempt = (await prisma.quiz.findUnique({
        where: {
            id: quizid
        }
    }))?.questions

    if(!attempt){
        throw new NotFoundError("Quiz not found")
    }
    const newAttempt = attempt.map((question) => {
        return {
            ...question,
            selected: body.find((q) => q.question === question.question)?.answer || null
        }
    })
    const score = newAttempt.filter((question) => question.selected === question.answer).length
    const quiz = await prisma.quiz.update({
        where: {
            id: quizid
        },
        data: {
            questions: newAttempt,
            score
        }
    })
    return NextResponse.json(quiz)
}