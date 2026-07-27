from django.shortcuts import render, redirect
from .forms import RegisterForm, NoteForm
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .models import Note
from django.shortcuts import get_object_or_404
from django.contrib.auth import logout

def home(request):
    return render(request, "home.html")

def register(request):
    print("Request Method:", request.method)

    if request.method == "POST":
        print("Form Submitted")

        form = RegisterForm(request.POST)

        if form.is_valid():
            print("Form is valid")
            form.save()
            return redirect("home")
        else:
            print("Form Errors:", form.errors)

    else:
        form = RegisterForm()

    return render(request, "register.html", {"form": form})

def login_user(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect("dashboard")
        else:
            messages.error(request, "Invalid username or password.")

    return render(request, "login.html")

@login_required
def dashboard(request):
    notes = Note.objects.filter(user=request.user).order_by('-created_at')

    context = {
        'notes': notes
    }

    return render(request, 'dashboard.html', context)

@login_required
def add_note(request):
    if request.method == "POST":
        form = NoteForm(request.POST)

        if form.is_valid():
            note = form.save(commit=False)
            note.user = request.user
            note.save()

            return redirect("dashboard")

    else:
        form = NoteForm()

    return render(request, "add_note.html", {"form": form})

@login_required
def edit_note(request, note_id):
    note = get_object_or_404(Note, id=note_id, user=request.user)

    if request.method == "POST":
        form = NoteForm(request.POST, instance=note)

        if form.is_valid():
            form.save()
            return redirect("dashboard")

    else:
        form = NoteForm(instance=note)

    return render(request, "edit_note.html", {"form": form})

@login_required
def delete_note(request, note_id):
    note = get_object_or_404(Note, id=note_id, user=request.user)

    if request.method == "POST":
        note.delete()
        return redirect("dashboard")

    return render(request, "delete_note.html", {"note": note})

@login_required
def logout_user(request):
    logout(request)
    return redirect("home")