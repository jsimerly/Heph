# Generated by Django 4.1.7 on 2023-03-11 04:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0006_alter_product_average_rating_alter_product_my_list'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='n_ratings',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
