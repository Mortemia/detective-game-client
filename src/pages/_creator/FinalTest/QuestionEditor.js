import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Typography } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import CreatorAPI from '../../../api/CreatorAPI';
import { AppContext } from '../../../context/appContext';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

const creatorAPI = new CreatorAPI();

const useStyles = makeStyles(theme => ({
  paper: {
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: ' space-between',
    //height: '200px',
  },
}));

const QuestionEditor = ({ question, update }) => {
  const classes = useStyles();
  const { appState } = React.useContext(AppContext);
  const [revealedToggle, setRevealedToggle] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [answers, setAnswers] = React.useState();

  React.useEffect(() => {
    if (question) {
      let answers = {};
      question.answers.forEach((answer, index) => {
        answers[`answer${index}`] = answer.content;
      });

      setAnswers(answers);
    }

    const correctAnswer =
      question?.answers.find(answer => answer.correct).content || '';
    setValue(correctAnswer);
  }, [question]);

  const handleRadioChange = event => {
    setValue(event.target.value);
  };

  const handleRevealedToggle = () => {
    revealedToggle ? setRevealedToggle(false) : setRevealedToggle(true);
  };

  React.useEffect(() => {
    setRevealedToggle(question?.revealed || false);
  }, [question]);

  return (
    <Paper className={classes.paper}>
      <Typography component='h2' variant='h6' color='primary' gutterBottom>
        {question ? 'Edycja pytania' : 'Dodawanie nowego pytania'}
      </Typography>
      {answers && (
        <Formik
          enableReinitialize
          initialValues={{
            content: question?.content || '',
            ...answers,
          }}
          onSubmit={(values, { setSubmitting }) => {
            let answers = question.answers.map((answer, index) => {
              let answerContent = values[`answer${index}`];
              return { content: answerContent, correct: true };
            });

            const questionPayload = {
              question: {
                case_id: appState.created_case_id,
                question_id: question?.question_id,
                content: question?.content,
                answers,
              },
            };

            console.log(questionPayload);
            creatorAPI[question ? 'updateQuestion' : 'createQuestion'](
              questionPayload
            ).then(response => {
              setSubmitting(false);
              update(response.data.question);
            });
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <DialogContent className={classes.form}>
                <Field
                  component={TextField}
                  name='content'
                  type='text'
                  label='Pytanie'
                  variant='outlined'
                  className={classes.textfield}
                  style={{
                    marginBottom: '24px',
                  }}
                />
                {question?.answers.map((answer, index) => (
                  <Field
                    key={index}
                    component={TextField}
                    name={`answer${index}`}
                    type='text'
                    label={`Odpowiedź #${index + 1}`}
                    variant='outlined'
                    className={classes.textfield}
                    style={{
                      marginBottom: '24px',
                    }}
                  />
                ))}

                {isSubmitting && <LinearProgress />}
                <br />

                <Typography
                  className={classes.typography}
                  color='textSecondary'
                ></Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  color='primary'
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Zatwierdź
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      )}
    </Paper>
  );
};

export default QuestionEditor;
