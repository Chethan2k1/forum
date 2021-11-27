import * as React from 'react';
import getTime from '../utils/time';
import { Grid, Button } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import MyHorizonatalLine from './Markdown/HorizontalLine'
import MyImageTag from './Markdown/Image'
import ReportIcon from '@mui/icons-material/Report';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const CommentsListView = ({ token, comments, setComments, setError, category, isloggedin = true, showButtons = false }) => {
    const commentReport = async (commentid) => {
        const reportResp = await fetch(`http://localhost:8000/report`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                reportedid: commentid,
                category,
                ispost: false
            })
        })

        const report = await reportResp.json()
        if (report.error != null) setError(report.error)
    }

    const deleteHandler = async (commentid) => {
        const deleteResp = await fetch(`http://localhost:8000/removecomment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                commentid
            })
        })

        const resp = await deleteResp.json();
        if (resp.error != null) setError(resp.error)
        else {
            console.log('Deleted Successfully!')
        }

        setComments(comments.filter((comment) => {
            return comment.commentid != commentid;
        }))
    }

    const unreportHandler = async (commentid) => {
        const unreportResp = await fetch(`http://localhost:8000/unreport`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                reportedid: commentid,
                ispost: false
            })
        })

        const resp = await unreportResp.json();
        if (resp.error != null) setError(resp.error)
        else {
            console.log('Unreported Successfully!')
        }
        
        setComments(comments.filter((comment) => {
            return comment.commentid != commentid;
        }))
    }

    return (
        <>
            {
                comments.map(({ username, content, createdAt, commentid }) => {
                    return (
                        <Grid
                            key={commentid}
                            item container
                            alignItems="center"
                            style={{
                                width: 600,
                                borderRadius: 10,
                                margin: 5,
                                backgroundColor: '#D3D3D3'
                            }}>
                            <Grid container direction="column">
                                <Grid item container justify="flex-end">
                                    <Grid item style={{ marginTop: 5, marginLeft: 20 }}>
                                        {`  posted by u/${username}  ${getTime(createdAt)}`}
                                    </Grid>
                                    {(isloggedin) ? (<Grid item justify="flex-start" style={{ marginTop: 5, marginLeft: 5 }}>
                                        <ReportIcon style={{ cursor: 'pointer' }} onClick={() => { commentReport(commentid) }} />
                                    </Grid>) : <div></div>}
                                </Grid>
                            </Grid>
                            <Grid align="left" style={{ width: 600, marginLeft: 20, marginRight: 20 }}>
                                <ReactMarkdown
                                    children={content}
                                    components={{
                                        hr: MyHorizonatalLine,
                                        img: MyImageTag
                                    }} />
                            </Grid>
                            {
                                (showButtons) ? (
                                    <Grid container item style={{ marginLeft: 20, marginBottom: 5 }}>
                                        <Button
                                            startIcon={<DeleteIcon />}
                                            style={{ color: '#FF0000' }}
                                            onClick={async () => {
                                                await deleteHandler(commentid);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            startIcon={<RemoveCircleIcon />}
                                            style={{ color: '#000000' }}
                                            onClick={async () => {
                                                await unreportHandler(commentid)
                                            }}
                                        >
                                            Unreport
                                        </Button>
                                    </Grid>
                                ) : (<div></div>)
                            }
                        </Grid>
                    )
                })
            }
        </>
    )
}

export default CommentsListView;