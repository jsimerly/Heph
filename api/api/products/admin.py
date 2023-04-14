from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Brand)
admin.site.register(Product)
admin.site.register(ProductMInfo)
admin.site.register(ProductReview)
admin.site.register(Stock)
admin.site.register(ProductImage)
admin.site.register(Category)
admin.site.register(FilterOption)
admin.site.register(FilterTag)


