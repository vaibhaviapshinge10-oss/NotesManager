from django.urls import path
from . import views

urlpatterns = [
    path("api/notes", views.notes_api, name="notes_api"),
    path("api/notes/<int:pk>", views.note_detail_api, name="note_detail_api"),
    path("api/register", views.register_api, name="register_api"),
]