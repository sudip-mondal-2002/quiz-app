import {Container, Typography} from "@mui/material";

type SummaryProps = {
    id: string;
    topic: string;
    score: number;
    createdAt: Date;
}
export const Summary = (props: {quizzes: SummaryProps[]})=>{
    return <>
        <Typography textAlign={'center'} >Your History</Typography>
        {props.quizzes.map((quiz)=>{
            return <Container key={quiz.id} sx={{
                border: '1px solid black',
                marginY: "8px"
            }} >
                <Typography sx={{
                    margin: "8px 0 2px 0",
                }} >Topic {quiz.topic} : Score {quiz.score}/10</Typography>
                <Typography>Taken on {quiz.createdAt.getDate()}/{quiz.createdAt.getMonth()}/{quiz.createdAt.getFullYear()}</Typography>
            </Container>
        })}
    </>
}