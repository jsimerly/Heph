# Generated by Django 4.1.7 on 2023-05-30 15:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0009_remove_productminfo_highlights_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='productminfo',
            name='bullets',
        ),
        migrations.AlterField(
            model_name='producthighlights',
            name='product_info',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='highlights', to='products.product'),
        ),
        migrations.AlterField(
            model_name='productspecs',
            name='product_info',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='specs', to='products.product'),
        ),
    ]
