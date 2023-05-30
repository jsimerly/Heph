from django.contrib import admin
from .models import *
from .forms import ProductAdminForm

class ProductHighlightsInline(admin.TabularInline):
    model = ProductHighlights
    extra = 4

class ProductSpecsInline(admin.TabularInline):
    model = ProductSpecs
    extra = 1

class ProductKeyAttributesInline(admin.TabularInline):
    model = ProductKeyAttributes
    extra = 1

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 3  # Number of empty forms displayed

class ProductMInfoInline(admin.StackedInline):
    model = ProductMInfo
    extra = 1

class ProductAdmin(admin.ModelAdmin):
    form = ProductAdminForm
    inlines = [
        ProductKeyAttributesInline,
        ProductImageInline,
        ProductMInfoInline,
        ProductHighlightsInline,
        ProductSpecsInline,
    ]

# Register your models here.
admin.site.register(Brand)
admin.site.register(Product, ProductAdmin)
admin.site.register(ProductReview)
admin.site.register(ProductGrouping)
admin.site.register(Stock)
admin.site.register(Category)
admin.site.register(FilterOption)
admin.site.register(FilterTag)


