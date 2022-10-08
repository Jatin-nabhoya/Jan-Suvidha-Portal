# Generated by Django 4.1.1 on 2022-10-07 19:36

import api.models
from django.conf import settings
import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('uid', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('email', models.CharField(max_length=255, unique=True)),
                ('password', models.CharField(max_length=255, null=True)),
                ('refreshtoken', models.CharField(default=None, max_length=255, null=True)),
                ('otp', models.SmallIntegerField(null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Department',
            fields=[
                ('deptid', models.AutoField(primary_key=True, serialize=False)),
                ('deptname', models.TimeField(max_length=50)),
                ('city', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Schemes',
            fields=[
                ('schemeid', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=500)),
                ('caste', models.CharField(max_length=255, null=True)),
                ('agegt', models.IntegerField(default=0, null=True)),
                ('agelt', models.IntegerField(default=0, null=True)),
                ('nationality', models.CharField(default='indian', max_length=255, null=True)),
                ('disability', models.BooleanField(default=False, null=True)),
                ('incomegt', models.IntegerField(default=0, null=True)),
                ('incomelt', models.IntegerField(default=0, null=True)),
                ('maritialstatus', models.CharField(default=None, max_length=255, null=True)),
                ('addedby', models.ForeignKey(db_column='addedby', default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserDetails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mobile', models.CharField(max_length=10)),
                ('dob', models.DateField()),
                ('address', models.CharField(max_length=255)),
                ('caste', models.CharField(max_length=255, null=True)),
                ('income', models.IntegerField()),
                ('maritialstatus', models.CharField(max_length=10)),
                ('disabilitycert', models.BooleanField(default=False)),
                ('nationality', models.CharField(default=None, max_length=30, null=True)),
                ('gender', models.CharField(default=None, max_length=1)),
                ('uid', models.OneToOneField(db_column='uid', default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='SchemesApplication',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fname', models.CharField(default=None, max_length=100)),
                ('courseduration', models.SmallIntegerField(default=None)),
                ('aadhaar', models.CharField(max_length=12)),
                ('currentclass', models.CharField(max_length=20)),
                ('state', models.CharField(max_length=50)),
                ('schemeid', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='api.schemes')),
                ('uid', models.OneToOneField(db_column='uid', default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='RequiredFields',
            fields=[
                ('rfid', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.BooleanField(default=False)),
                ('nominee', models.BooleanField(default=False)),
                ('mobile', models.BooleanField(default=False)),
                ('dob', models.BooleanField(default=False)),
                ('gender', models.BooleanField(default=False)),
                ('address', models.BooleanField(default=False)),
                ('marital_status', models.BooleanField(default=False)),
                ('nationality', models.BooleanField(default=False)),
                ('disabilitycert', models.BooleanField(default=False)),
                ('income', models.BooleanField(default=False)),
                ('lastacquired', models.BooleanField(default=False)),
                ('caste', models.BooleanField(default=False)),
                ('fname', models.BooleanField(default=False)),
                ('aadhaar', models.BooleanField(default=False)),
                ('state', models.BooleanField(default=False)),
                ('couraseduration', models.BooleanField(default=False)),
                ('currentclass', models.BooleanField(default=False)),
                ('schemeid', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.schemes')),
            ],
        ),
        migrations.CreateModel(
            name='RequiredDocs',
            fields=[
                ('rdid', models.AutoField(primary_key=True, serialize=False)),
                ('castecert', models.BooleanField(default=False)),
                ('incomecertificate', models.BooleanField(default=False)),
                ('rationcard', models.BooleanField(default=False)),
                ('noncreamylayer', models.BooleanField(default=False)),
                ('marksheet10', models.BooleanField(default=False)),
                ('marksheet12', models.BooleanField(default=False)),
                ('aadhar', models.BooleanField(default=False)),
                ('pancard', models.BooleanField(default=False)),
                ('drivinglicense', models.BooleanField(default=False)),
                ('voteridcard', models.BooleanField(default=False)),
                ('schemeid', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='api.schemes')),
            ],
        ),
        migrations.CreateModel(
            name='DepartmentHead',
            fields=[
                ('dhid', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('deptid', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='api.department')),
            ],
        ),
        migrations.CreateModel(
            name='CitizenDocs',
            fields=[
                ('docsid', models.AutoField(primary_key=True, serialize=False)),
                ('auid', models.SmallIntegerField(default=None)),
                ('aname', models.CharField(default=None, max_length=50, null=True)),
                ('agender', models.CharField(default=None, max_length=1, null=True)),
                ('aaddress', models.CharField(default=None, max_length=255, null=True)),
                ('adob', models.DateField(default=None, null=True)),
                ('incomecertificate', models.FileField(default=None, upload_to=api.models.CitizenDocs.use_directory_path)),
                ('rationcard', models.FileField(default=None, upload_to=api.models.CitizenDocs.use_directory_path)),
                ('noncreamylayer', models.FileField(default=None, upload_to=api.models.CitizenDocs.use_directory_path)),
                ('marksheet10', models.FileField(default=None, upload_to=api.models.CitizenDocs.use_directory_path)),
                ('marksheet12', models.FileField(default=None, upload_to=api.models.CitizenDocs.use_directory_path)),
                ('disabilitycert', models.FileField(default=None, upload_to=api.models.CitizenDocs.use_directory_path)),
                ('schemeid', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='api.schemes')),
                ('uid', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='AppliedSchemes',
            fields=[
                ('asid', models.AutoField(primary_key=True, serialize=False)),
                ('schemeid', models.ForeignKey(db_column='schemeid', default=None, on_delete=django.db.models.deletion.CASCADE, to='api.schemes')),
                ('uid', models.OneToOneField(db_column='uid', default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
