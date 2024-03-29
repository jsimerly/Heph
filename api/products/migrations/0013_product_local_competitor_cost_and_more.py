# Generated by Django 4.1.7 on 2023-06-16 18:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0012_alter_product_insurance_base_cost_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='local_competitor_cost',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True),
        ),
        migrations.AddField(
            model_name='product',
            name='local_competitor_delivery_fee',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True),
        ),
    ]
