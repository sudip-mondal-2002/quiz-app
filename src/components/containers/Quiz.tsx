'use client'

import React, { useState } from 'react';
import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Paper,
    Typography, Container, Button,
} from '@mui/material';
import {Option} from ".prisma/client";
import axios from "axios";

interface Question {
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
}

interface QuizProps {
    questions: Question[];
    quizId: string;
}

export const Quiz: React.FC<QuizProps> = (props) => {
    const [selectedOptions, setSelectedOptions] = useState<Option[]>(Array(props.questions.length).fill(''));

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const updatedSelectedOptions = [...selectedOptions];
        updatedSelectedOptions[index] = event.target.value as Option;
        setSelectedOptions(updatedSelectedOptions);
    };

    return (
        <Container>
            {props.questions.map((question, index) => (
                <Paper key={index} elevation={3} style={{ padding: '16px', margin: '16px 0' }}>
                    <Typography variant="h6">{question.question}</Typography>
                    <FormControl component="fieldset">
                        <RadioGroup
                            aria-label={`options${index}`}
                            name={`options${index}`}
                            value={selectedOptions[index]}
                            onChange={(event) => handleOptionChange(event, index)}
                        >
                            <FormControlLabel
                                value="A"
                                control={<Radio />}
                                label={question.optionA}
                            />
                            <FormControlLabel
                                value="B"
                                control={<Radio />}
                                label={question.optionB}
                            />
                            <FormControlLabel
                                value="C"
                                control={<Radio />}
                                label={question.optionC}
                            />
                            <FormControlLabel
                                value="D"
                                control={<Radio />}
                                label={question.optionD}
                            />
                        </RadioGroup>
                    </FormControl>
                </Paper>
            ))}
            <Button variant={"contained"} onClick={async ()=>{
                const data:{question: string, answer: Option}[] = props.questions.map((q, i)=>{
                    return {question: q.question, answer: selectedOptions[i]}
                })
                await axios.post(`/api/submit/${props.quizId}`, data)
                window.location.href = "/"
            }}>
                Submit
            </Button>
        </Container>
    );
};
