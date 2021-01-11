import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/dCandidate'
import DCandidateForm from './DCandidateForm';
import { Grid,Paper,TableContainer,Table,TableHead,TableCell, TableRow, TableBody, withStyles,Button, ButtonGroup } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {useToasts} from 'react-toast-notifications';
const styles = theme => {
    return {
        root: {
            "& .MuiTableCell-head": {
                fontSize:"1.25rem"
            }
        },
        paper: {
            margin: theme.spacing(2), // spacing(1) = 8px 
            padding: theme.spacing(2)
        }
    }
}

// const styles is assigned to props with the help of withStyles(styles) function imported from @material-ui/core
const DCandidates = ({classes,...props}) => {

    // use toast
    const { addToast } = useToasts();
    const [currentId, setCurrentId] = useState(0);
    useEffect(()=>{
        props.fetchAllDCandidates()
    },[]) //Behaves as ComponentDidMount when the param is an empty array 

    const onDelete = (id)=> {
        if(window.confirm("Are you sure to delete this record")){
        const onSuccess = () => { 
            addToast("Deleted Successfully", {appearance:'info'})
           }
        props.deleteDCandidate(id, ()=> {
            onSuccess();
        })
    }
    }
    return (
        <Paper className={classes.paper} elevation={3}>
        <Grid container>
                <Grid item xs={6}>
                    <DCandidateForm {...({ currentId, setCurrentId})}/>
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Mobile</TableCell>
                                    <TableCell>Blood Group</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.dCandidateList.map((record,index)=>{
                                    return(
                                    <TableRow key={index} hover>
                                    <TableCell>{record.fullName}</TableCell>
                                    <TableCell>{record.mobile}</TableCell>
                                    <TableCell>{record.bloodGroup}</TableCell>
                                    <TableCell>
                                        <ButtonGroup>
                                            <Button><EditIcon color="primary"
                                                onClick={ ()=> {setCurrentId(record.id)}}/></Button>
                                            <Button><DeleteIcon color="secondary"
                                                onClick={()=>onDelete(record.id)}/></Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                                    )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
        </Grid>
        </Paper>
    );

    
}

const mapStateToProps = state => {
    return {
        dCandidateList : state.dCandidate.list
    }
}

const mapActionToProps = {
    fetchAllDCandidates: actions.fetchAll,
    deleteDCandidate : actions.Delete
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(DCandidates));