from django.shortcuts import render, redirect
from .forms import RegisterForm
from django.contrib.auth import authenticate, login
from django.contrib import messages

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
            return redirect("home")
        else:
            messages.error(request, "Invalid username or password.")

    return render(request, "login.html")