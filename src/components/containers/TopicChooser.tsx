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