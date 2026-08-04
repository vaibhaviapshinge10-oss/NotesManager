from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("register/", views.register, name="register"),
    path("login/", views.login_user, name="login"),
    path("dashboard/", views.dashboard, name="dashboard"),
    path("add-note/", views.add_note, name="add_note"),
    path("edit-note/<int:note_id>/", views.edit_note, name="edit_note"),
    path("delete-note/<int:note_id>/", views.delete_note, name="delete_note"),
    path("logout/", views.logout_user, name="logout"),
    path("api/notes", views.notes_api, name="notes_api"),
    path("api/register", views.register_api, name="register_api"),
    path("api/notes/<int:pk>", views.note_detail_api, name="note_detail_api"),
]