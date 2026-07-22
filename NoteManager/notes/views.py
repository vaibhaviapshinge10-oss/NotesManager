from django.shortcuts import render, redirect
from .forms import RegisterForm

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