# Generated by Django 4.1.7 on 2023-04-21 23:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0004_remove_product_internal_description_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='productreview',
            name='initial_review',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='productreview',
            name='report_viewed',
            field=models.BooleanField(default=False),
        ),
    ]
