import { Button, Divider, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useLocation, useNavigate } from 'react-router-dom';

interface CustomizedState {
    error: CustomizedErrorState;
}

interface CustomizedErrorState {
    detail: string;
    title: string;
}

export default function ServerError() {
    const navigation = useNavigate();
    const location = useLocation();
    const state = location.state as CustomizedState;

    return (
        <Container component={Paper}>
            {state?.error ? (
                <>
                    <Typography variant="h3" color='error' gutterBottom>{state.error.title}</Typography>
                    <Divider />
                    <Typography>{state.error.detail || 'Internal server error'}</Typography>
                </>
            ) : (
                <Typography variant="h5" gutterBottom>Server error</Typography>

            )}
            <br />
            <Button onClick={() => navigation("/catalog")}>Go back to the store</Button>
        </Container>
    )
}