# Generated by Django 4.1.7 on 2023-03-27 20:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0025_product_category'),
        ('orders', '0003_cartitems_stock_remove_cartitems_item_cartitems_item'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cart',
            name='insurance_total',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AlterField(
            model_name='cart',
            name='promos',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='orders.promo'),
        ),
        migrations.AlterField(
            model_name='cart',
            name='sub_total',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AlterField(
            model_name='cart',
            name='tax_total',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AlterField(
            model_name='cart',
            name='total_cost',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AlterField(
            model_name='cartitems',
            name='stock',
            field=models.ManyToManyField(to='products.stock'),
        ),
    ]