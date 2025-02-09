# Generated by Django 4.1 on 2022-08-30 07:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0003_remove_payment_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='Withdraw',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254)),
                ('amount', models.CharField(max_length=30)),
                ('beneficiary_fullname', models.CharField(max_length=200)),
                ('beneficiary_address', models.CharField(max_length=200)),
                ('beneficiary_city', models.CharField(max_length=200)),
                ('beneficiary_zip', models.CharField(max_length=200)),
                ('beneficiary_country', models.CharField(max_length=200)),
                ('bank_account', models.CharField(max_length=200)),
                ('bank_name', models.CharField(max_length=200)),
                ('branch_code', models.CharField(max_length=200)),
                ('bank_address', models.CharField(max_length=200)),
                ('beneficiary_swift', models.CharField(max_length=200)),
                ('bic', models.CharField(max_length=200)),
                ('notes', models.CharField(max_length=200)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('status', models.BooleanField(default=False)),
            ],
        ),
    ]
