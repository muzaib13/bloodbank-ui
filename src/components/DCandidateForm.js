import React, { useState,useEffect } from 'react';
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, withStyles, FormHelperText} from '@material-ui/core'
import useForm from './useForm';
import { connect } from 'react-redux';
import * as actions from '../actions/dCandidate'
import {useToasts} from 'react-toast-notifications';
const styles = theme => {
    return{
    root: {
        "& .MuiTextField-root":{
            margin: theme.spacing(1),
            minWidth: 230
        }
    },
    formControl:{
            margin: theme.spacing(1),
            minWidth: 230
    },
    buttonStyle : {
        margin: theme.spacing(1),
    }
}
}
const initialFieldValues = {
    fullName : '',
    mobile : '',
    email : '',
    age: '',
    bloodGroup: '',
    address : ''
}
const DCandidateForm = ({classes,...props}) => {

    // use toast
     const { addToast } = useToasts();

    const validate = (fieldValues = values) => {
        let temp = {...errors};
        if('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required.";
        if('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile ? "" : "This field is required.";
        if('bloodGroup' in fieldValues)
            temp.bloodGroup = fieldValues.bloodGroup ? "" : "This field is required.";
        if('email' in fieldValues)
            temp.email = (/^$|.*@.*..*/).test(fieldValues.email) ? "" : "Email is not valid."

        setErrors({
            ...temp
        })

        if(fieldValues === values)
            return Object.values(temp).every(x => x == "");
    }
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues,validate,props.setCurrentId);
    
    const handleSubmit = e => {
        e.preventDefault();
        if(validate()) {
            const onSuccess = () => { resetForm()
                 addToast("Submitted Successfully", {appearance:'success'})
                }
            if(props.currentId == 0){
            props.createDCandidate(values,onSuccess)
            setErrors({});
        } 
        else {
            props.updateDCandidate(props.currentId,values,onSuccess)
        }
        }
        
    }
    useEffect(() => {
        if(props.currentId != 0) {
            setValues({
                ...props.dCandidateList.find(x=> x.id == props.currentId)
            })
        }
    }, [props.currentId])
    return(
        <form autoComplete="off" noValidate  className = {classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                    name="fullName"
                    variant="outlined"
                    label="Full Name"
                    value = {values.fullName}
                    onChange = {handleInputChange}
                    {...(errors.fullName && {error:true, helperText: errors.fullName})}
                    />
                    <TextField
                    name="mobile"
                    variant="outlined"
                    label="Mobile No."
                    value = {values.mobile}
                    onChange = {handleInputChange}
                    {...(errors.mobile && {error:true, helperText: errors.mobile})}
                    />
                    <FormControl variant="outlined" 
                    className = {classes.formControl}
                    {...(errors.bloodGroup && {error:true})}
                    >
                        <InputLabel>Blood Group</InputLabel>
                        <Select 
                        name= "bloodGroup"
                        value = {values.bloodGroup}
                        onChange={handleInputChange}
                        >
                        <MenuItem value="">Select Blood Group</MenuItem>
                        <MenuItem value="O+">O +ve</MenuItem>
                        <MenuItem value="O-">O -ve</MenuItem>
                        <MenuItem value="A+">A +ve</MenuItem>
                        <MenuItem value="AB+">AB +ve</MenuItem>
                        <MenuItem value="B+">B +ve</MenuItem>
                        </Select>
                        {(errors.bloodGroup && <FormHelperText>{errors.bloodGroup}</FormHelperText>)}
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                <TextField
                    name="age"
                    variant="outlined"
                    label="Age"
                    value = {values.age}
                    onChange = {handleInputChange}
                    />
                <TextField
                    name="email"
                    variant="outlined"
                    label="Email"
                    value = {values.email}
                    onChange = {handleInputChange}
                    {...(errors.email && {error:true, helperText: errors.email})}
                    />
                <TextField
                    name="address"
                    variant="outlined"
                    label="Address"
                    value = {values.address}
                    onChange = {handleInputChange}
                    />
                <div style={{marginLeft:"-120px"}}>
                    <Button
                    className={classes.buttonStyle}
                    variant="contained"
                    color = "primary"
                    type="Submit"
                    >
                        Submit
                    </Button>
                    <Button
                    className={classes.buttonStyle}
                    variant="contained"
                    color = "secondary"
                    onClick={resetForm}
                    >
                        Reset
                    </Button>
                </div>
                </Grid>
            </Grid>
        </form>
    );
}

const mapStateToProps = state => {
    return {
        dCandidateList : state.dCandidate.list
    }
}

const mapActionToProps = {
    createDCandidate: actions.create,
    updateDCandidate: actions.update
}
export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(DCandidateForm));