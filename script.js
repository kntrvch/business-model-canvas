Vue.filter('date', time => moment(time).format('DD/MM/YY, HH:mm'));

new Vue({

  el: '#app',
  store,
  data () {
    return {
      content: 'This is a project.',
      projects: JSON.parse(localStorage.getItem('projects')) || [], 
      selectedId: localStorage.getItem('selected-id') || null
    }
  },

  computed: {
    projectPreview () {
      // Markdown rendered to HTML
      return this.selectedProject ? marked(this.selectedProject.content) : '';
    },
    addButtonTitle () {
      return this.projects.length + ' project(s) already'
    }, 
    selectedProject () {
      return this.projects.find(project => project.id === this.selectedId);
    }, 
    sortedProjects () {
      return this.projects.slice()
      .sort((a, b) => a.created - b.created)
      .sort((a, b) => (a.favorite === b.favorite) ? 0 : a.favorite ? -1 : 1)
    }, 
    cards () {
      return this.$store.state.cards
    }
  },

  watch: {
    projects: {
      handler: 'saveProjects',
      deep: true,
    }, 
    selectedId (val) {
      localStorage.setItem('selected-id', val)
    }
  },

  methods: {
    reportOperation (opName) {
      console.log('The', opName, 'operation was completed!')
    },
    addProject () {
      const time = Date.now();
      const project = {
        id: String(time),
        title: 'New project ' + (this.projects.length + 1),
        content: '**Hi!** This projectbook is using [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for formatting!',
        created: time,
        favorite: false
      };
      this.projects.push(project);
      this.reportOperation('project added');
    }, 
    removeProject () {
      if (this.selectedProject && confirm('Delete the project?')) {
        // Remove the project in the projects array
        const index = this.projects.indexOf(this.selectedProject);
        if (index !== -1) {
          this.projects.splice(index, 1);
        }
      }
    },
    removeAllProjects () {
      if (confirm('Delete all projects?')) {
        this.projects.splice(0, this.projects.length);
        this.saveProjects();
      }
    },
    favoriteProject () {
      this.selectedProject.favorite ^= true;
    },
    selectProject (project) {
      this.selectedId = project.id;
    }, 
    saveProjects() {
      localStorage.setItem('projects', JSON.stringify(this.projects));
      console.log('Projects saved!', new Date())
    }
  },

  created () {
    this.content = localStorage.getItem('content') || 'You can write in **markdown**';
  }, 

  components: {
    'Project': httpVueLoader('components/Project.vue')
  }
});
