# Generated by Django 4.1.7 on 2023-04-28 17:56

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0007_productreview_anonymous'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productimage',
            name='uuid',
            field=models.UUIDField(default=uuid.uuid4, editable=False, unique=True),
        ),
    ]
