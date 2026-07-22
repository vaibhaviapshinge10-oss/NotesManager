from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from .forms import NoteForm
from .models import Note


@login_required
def dashboard(request):
    notes = Note.objects.filter(user=request.user)
    return render(request, 'dashboard.html', {'notes': notes})


@login_required
def add_note(request):
    if request.method == 'POST':
        form = NoteForm(request.POST)

        if form.is_valid():
            note = form.save(commit=False)
            note.user = request.user
            note.save()
            return redirect('dashboard')

    else:
        form = NoteForm()

    return render(request, 'add_note.html', {'form': form})