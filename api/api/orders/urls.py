from django.urls import path
from orders.views import *

urlpatterns = [
    path('add-items/', CartItemAddView.as_view(), name='add_cart_item'),
    path('items/<uuid:uuid>/', CartItemDeleteView.as_view(), name='delete_cart_item'),
    path('cart/', CartView.as_view(), name='view_cart'),
    path('favorite-item/<slug:slug>/', AddFavoritedItemView.as_view(), 
    name='favorite_item'),
    path('cart-size/', CartSizeView.as_view(), name='cart_size'),
    path('remove-favorite/<uuid:uuid>/', FavoriteItemDeleteView.as_view(), name='remove_favorite'),
    path('all-favorites/', FavoritedItemsView.as_view(), name='all_favorites')
]