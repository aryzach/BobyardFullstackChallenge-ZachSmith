from django.urls import path, include
from . import views

urlpatterns = [
    # Endpoint to list all comments and add a new comment
    path('comments/', views.comments, name='comments'),

    # Endpoint to edit or delete a specific comment
    path('comments/<int:comment_id>/', views.comment_detail, name='comment_detail'),
]