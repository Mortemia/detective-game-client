import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Typography, Checkbox } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import CreatorAPI from '../../../api/CreatorAPI';
import { AppContext } from '../../../context/appContext';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import { TextField as MaterialField } from '@material-ui/core';

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
  const [questionContent, setQuestionContent] = React.useState(null);
  const [answers, setAnswers] = React.useState(question?.answers || []);

  React.useEffect(() => {
    setQuestionContent(question?.content || '');
    setAnswers(question?.answers || []);
  }, [question]);

  const onAnswerChange = (event, index, correct) => {
    let updatedAnswers = [...answers];
    updatedAnswers[index] = { content: event.target.value, correct };
    setAnswers(updatedAnswers);
  };

  const changeCorrect = index => {
    let updatedAnswers = [...answers];
    updatedAnswers.forEach(a => (a.correct = false));
    updatedAnswers[index].correct = true;
    setAnswers(updatedAnswers);
  };

  const deleteAnswer = index => {
    let updatedAnswers = [...answers];

    updatedAnswers.splice(index, 1);

    setAnswers(updatedAnswers);
  };

  const addAnswer = (content, correct) => {
    setAnswers([
      ...answers,
      { content, correct: answers.length === 0 ? true : correct },
    ]);
  };

  return (
    <Paper className={classes.paper}>
      <Typography component='h2' variant='h6' color='primary' gutterBottom>
        {question ? 'Edycja pytania' : 'Dodawanie nowego pytania'}
      </Typography>

      <Formik
        enableReinitialize
        initialValues={{
          content: question?.content || '',
          ...answers,
        }}
        onSubmit={(values, { setSubmitting }) => {
          const questionPayload = {
            question: {
              case_id: appState.created_case_id,
              question_id: question?.question_id,
              content: questionContent,
              answers,
            },
          };

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
              <MaterialField
                name='content'
                type='text'
                label='Pytanie'
                variant='outlined'
                className={classes.textfield}
                style={{
                  marginBottom: '24px',
                }}
                value={questionContent || ''}
                onChange={e => setQuestionContent(e.target.value)}
              />
              {answers &&
                answers.map(({ content, correct }, index) => (
                  <FormControl
                    style={{
                      display: 'flex',
                      marginBottom: '24px',
                      flexDirection: 'row',
                    }}
                    key={index}
                  >
                    <Radio
                      checked={!!correct}
                      onChange={() => changeCorrect(index)}
                    />
                    <MaterialField
                      type='text'
                      label={`Odpowiedź #${index + 1}`}
                      variant='outlined'
                      className={classes.textfield}
                      fullWidth
                      value={answers[index].content || ''}
                      onChange={e => onAnswerChange(e, index, correct)}
                    />
                    <IconButton edge='end' onClick={() => deleteAnswer(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </FormControl>
                ))}

              <Button
                color='primary'
                disabled={isSubmitting}
                onClick={() => addAnswer()}
              >
                Dodaj odpowiedź
              </Button>

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
                disabled={isSubmitting || !answers.length}
                onClick={submitForm}
              >
                Zatwierdź
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default QuestionEditor;
