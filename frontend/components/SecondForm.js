import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {
  useFieldArray,
  useForm,
  useFormContext,
  Controller,
} from "react-hook-form";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
export default function SecondForm({ formContent, option, setOption }) {
  const methods = useFormContext();
  const {
    register,
    errors,
    watch,
    reset,
    getValues,
    control,
    handleSubmit,
    setValue,
  } = methods;

  useEffect(() => {
    reset({ ...formContent.two }, { errors: true });
  }, [option]);
  const options = [
    { value: "Morale", label: "Morale" },
    { value: "Physique", label: "Physique" },
  ];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            inputRef={register}
            select
            name="option"
            value={option}
            onChange={(e) => setOption(e.target.value)}
            label={"Type Entreprise"}
          >
            {options.map((option) => (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {option == "Morale" ? (
          <>
            <Grid item xs={12} md={6}>
              <TextField
                required
                name="raison"
                inputRef={register}
                label="Raison"
                fullWidth
              />
            </Grid>
          </>
        ) : null}
        {option == "Physique" ? (
          <>
            <Grid item xs={12} md={6}>
              <TextField
                required
                inputRef={register}
                name="nomEntreprise"
                label="Nom"
                fullWidth
                autoComplete="cc-number"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cvv"
                inputRef={register}
                name="prenomEntreprise"
                label="Prenom"
                fullWidth
              />
            </Grid>
          </>
        ) : null}
      </Grid>
    </React.Fragment>
  );
}
