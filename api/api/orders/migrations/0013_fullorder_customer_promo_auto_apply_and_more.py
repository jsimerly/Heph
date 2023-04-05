# Generated by Django 4.1.7 on 2023-04-04 05:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0025_product_category'),
        ('customer', '0005_alter_browsehistory_customer'),
        ('orders', '0012_alter_itemfavorited_item'),
    ]

    operations = [
        migrations.AddField(
            model_name='fullorder',
            name='customer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='orders', to='customer.customer'),
        ),
        migrations.AddField(
            model_name='promo',
            name='auto_apply',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='promo',
            name='description',
            field=models.TextField(default='Ass'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='promo',
            name='end_date',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='promo',
            name='start_date',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='promo',
            name='code',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='promo',
            name='flat_discount',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True),
        ),
        migrations.AlterField(
            model_name='promo',
            name='free_item',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='products.product'),
        ),
        migrations.AlterField(
            model_name='promo',
            name='percentage_discont',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=2, null=True),
        ),
    ]