# Generated by Django 4.1.7 on 2023-04-20 16:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='MarketingEmailSubmission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_added', models.DateTimeField(auto_now_add=True)),
                ('last_modified', models.DateTimeField(auto_now=True)),
                ('active', models.BooleanField(default=True)),
                ('email', models.EmailField(max_length=255, unique=True, verbose_name='Email')),
            ],
        ),
    ]
