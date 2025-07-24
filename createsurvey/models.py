from django.db import models

# Create your models here.
class Survey(models.Model):
    name=models.CharField(max_length=128)
    description=models.CharField(max_length=1024)

class SurveyQuestion(models.Model):
    question=models.CharField(max_length=256)
    needs_answer=models.BooleanField()
    question_on_survey = models.ForeignKey(Survey, on_delete=models.CASCADE)

    class Meta:
        abstract=True

class OpenQuestion(SurveyQuestion):
    pass

class MultipleOptionQuestion(SurveyQuestion):
    pass

class Rating(SurveyQuestion):
    pass

class NetPromoterScoreQuestion(SurveyQuestion):
    less_likely_text=models.CharField(max_length=32)
    most_likely_text=models.CharField(max_length=32)