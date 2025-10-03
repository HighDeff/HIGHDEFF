import './style.css';
import { supabase, type Project } from './supabase';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <header>
    <div class="container">
      <a href="#" class="logo">HighDeff</a>
      <nav>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
      </nav>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="container">
        <h1>Hi there, I'm HighDeff</h1>
        <p>A passionate developer building amazing web experiences. Currently exploring modern web technologies and contributing to open source projects.</p>
        <div class="cta-buttons">
          <a href="#projects" class="btn btn-primary">View My Work</a>
          <a href="#contact" class="btn btn-secondary">Get in Touch</a>
        </div>
      </div>
    </section>

    <section id="projects">
      <div class="container">
        <h2 class="section-title">Projects</h2>

        <div class="add-project-form">
          <h3>Add New Project</h3>
          <form id="project-form">
            <div class="form-group">
              <label for="title">Project Title</label>
              <input type="text" id="title" name="title" required placeholder="My Awesome Project">
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea id="description" name="description" required placeholder="Describe your project..."></textarea>
            </div>
            <div class="form-group">
              <label for="tags">Tags (comma-separated)</label>
              <input type="text" id="tags" name="tags" required placeholder="React, TypeScript, Node.js">
            </div>
            <button type="submit" class="btn btn-primary">Add Project</button>
          </form>
        </div>

        <div id="projects-container" class="loading">Loading projects...</div>
      </div>
    </section>

    <section id="skills" class="skills-section">
      <div class="container">
        <h2 class="section-title">Skills & Technologies</h2>
        <div class="skills-grid">
          <div class="skill-item">
            <h3>Frontend</h3>
            <p>React, Vue, TypeScript</p>
          </div>
          <div class="skill-item">
            <h3>Backend</h3>
            <p>Node.js, Express, APIs</p>
          </div>
          <div class="skill-item">
            <h3>Database</h3>
            <p>PostgreSQL, Supabase</p>
          </div>
          <div class="skill-item">
            <h3>Tools</h3>
            <p>Git, Vite, Docker</p>
          </div>
        </div>
      </div>
    </section>

    <section id="contact">
      <div class="container">
        <h2 class="section-title">Get In Touch</h2>
        <p class="contact-summary">
          I'm always interested in hearing about new projects and opportunities.
          Feel free to reach out if you'd like to collaborate!
        </p>
      </div>
    </section>
  </main>

  <footer>
    <div class="container">
      <p>Built with Vite, TypeScript, and Supabase</p>
    </div>
  </footer>
`;

async function loadProjects() {
  const container = document.getElementById('projects-container')!;
  const supabaseClient = supabase;

  if (!supabaseClient) {
    container.classList.remove('loading');
    container.innerHTML = '<p class="integration-warning">Supabase is not configured. Add your credentials to display projects.</p>';
    return;
  }

  try {
    const { data: projects, error } = await supabaseClient
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    container.classList.remove('loading');

    if (!projects || projects.length === 0) {
      container.innerHTML = '<p class="loading">No projects yet. Add your first project above!</p>';
      return;
    }

    container.innerHTML = `
      <div class="projects-grid">
        ${projects.map((project: Project) => `
          <div class="project-card">
            <h3>${escapeHtml(project.title)}</h3>
            <p>${escapeHtml(project.description)}</p>
            <div class="project-tags">
              ${project.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } catch (error) {
    console.error('Error loading projects:', error);
    container.classList.remove('loading');
    container.innerHTML = '<div class="error">Failed to load projects. Please try again later.</div>';
  }
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

async function handleProjectSubmit(e: Event) {
  e.preventDefault();

  const form = e.target as HTMLFormElement;
  const supabaseClient = supabase;

  if (!supabaseClient) {
    alert('Supabase is not configured. Please add your credentials to enable project submissions.');
    return;
  }

  const formData = new FormData(form);

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const tagsString = formData.get('tags') as string;
  const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

  try {
    const { error } = await supabaseClient
      .from('projects')
      .insert([{ title, description, tags }]);

    if (error) throw error;

    form.reset();
    await loadProjects();
  } catch (error) {
    console.error('Error adding project:', error);
    alert('Failed to add project. Please try again.');
  }
}

const projectForm = document.getElementById('project-form')!;
projectForm.addEventListener('submit', handleProjectSubmit);

loadProjects();
