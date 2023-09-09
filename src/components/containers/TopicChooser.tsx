'use client'

import {Button, Container, InputLabel, MenuItem, Select} from "@mui/material";
import {useState} from "react";

export const TopicChooser = () => {
    const [topic, setTopic] = useState<string>("")
    return <Container sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        <InputLabel id="select-label">Choose Topic</InputLabel>
        <Select labelId="select-label" sx={{
            width: '40%',
        }}
                value={topic}
                onChange={e => setTopic(e.target.value)}
        >
            <MenuItem value={"Geography"}>Geography</MenuItem>
            <MenuItem value={"History"}>History</MenuItem>
            <MenuItem value={"Programming"}>Programming</MenuItem>
            <MenuItem value={"Mathematics"}>Mathematics</MenuItem>
            <MenuItem value={"Science"}>Science</MenuItem>
            <MenuItem value={"Art"}>Art</MenuItem>
            <MenuItem value={"Physics"}>Physics</MenuItem>
            <MenuItem value={"Chemistry"}>Chemistry</MenuItem>
            <MenuItem value={"Biology"}>Biology</MenuItem>
            <MenuItem value={"English"}>English</MenuItem>
            <MenuItem value={"Physical Education"}>Physical Education</MenuItem>
            <MenuItem value={"Economics"}>Economics</MenuItem>
            <MenuItem value={"Political Science"}>Political Science</MenuItem>
            <MenuItem value={"Psychology"}>Psychology</MenuItem>
            <MenuItem value={"Sociology"}>Sociology</MenuItem>
            <MenuItem value={"Business Studies"}>Business Studies</MenuItem>
            <MenuItem value={"Neuroscience"}>Neuroscience</MenuItem>
            <MenuItem value={"Music"}>Music</MenuItem>
            <MenuItem value={"Environmental Science"}>Environmental Science</MenuItem>


        </Select>
        <Button disabled={!topic} sx={{
            width: '40%',
        }}
                onClick = {() => {
                    window.location.href = `/quiz/${topic.toLowerCase()}`
                }}
        >
            Start Quiz
        </Button>
    </Container>
}