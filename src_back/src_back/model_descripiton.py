from apps.survey_manage.survey_base.models import *
from apps.survey_manage.answer_blocks.models import *
from apps.survey_manage.question_blocks.models import *
from apps.profile_manage.models import *
from apps.survey_passing.models import *

ALL_USER_PROFILE_MODELS = [
    Profile,
]

ALL_SURVEY_MODELS = [
    ISurvey,

    SurveySimple,
    SurveyTest,
]

ALL_QUESTION_MODELS = [
    IQuestion,
    ITestQuestion,

    QuestionSimple,
    QuestionTestSimpleEv,
]

ALL_ANSWER_MODELS = [
    IAnswer,
    IFreeAnswer,

    AnswerSelectableSimple,
    AnswerSelectableTest,
    AnswerTextInput,
]

ALL_TAKING_SURVEY_MODELS = [
    TakingSurvey,

    IResultAnswer,

    ResultSelect,
    ResultTextInput,
]

