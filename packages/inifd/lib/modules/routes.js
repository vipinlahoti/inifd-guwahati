import { addRoute } from 'meteor/vulcan:core';

addRoute([
  {name: 'home',          path: '/',                  componentName: 'HomePage'},
  {name: 'pages-single',  path: '/page/:_id/:slug?',  componentName: 'PagesPage'},
  {name: 'pages-course',  path: '/courses',      componentName: 'CoursePage'},
  {name: 'pages-contact', path: '/contact',      componentName: 'ContactPage'},
  {name: 'pages-events',  path: '/events',      componentName: 'OurEventsPage'},
  {name: 'pages-mentors',  path: '/mentors',      componentName: 'MentorsPage'},
  {name: 'pages-faculty',  path: '/faculty',      componentName: 'FacultyPage'},
  {name: 'pages-corporate-partners',  path: '/corporate-partners',      componentName: 'CorporatePartners'},

  // Accounts
  // {name: 'login',           path: '/login',            componentName: 'LoginPage'},
  // {name: 'register',        path: '/register',         componentName: 'RegisterPage'},
  // {name: 'forgot-password', path: '/forgot-password',  componentName: 'ForgotPassword'},
  // {name: 'reset-password',  path: '/reset-password',   componentName: 'ResetPassword'},

  // docs
  // {name: 'programs.new',        path: '/programs',                 componentName: 'ProgramsHome'},
  // {name: 'docs.course',   path: '/docs/course/:slug',  componentName: 'DocsCourse'},

  // Courses
  {name: 'programs.course',   path: '/course/:_id/:slug?',  componentName: 'ProgramsCourse'},
  {name: 'programs.single',   path: '/programs/:_id/:slug?',     componentName: 'ProgramsPage'},

  // users
  {name: 'users.profile',   path: '/users/:slug',       componentName: 'UsersProfile',},
  {name: 'users.account',   path: '/accounts',          componentName: 'UsersAccount',        layoutName: 'AdminLayout'},
  {name: 'users.edit',      path: '/users/:slug/edit',  componentName: 'UsersEdit',           layoutName: 'AdminLayout'},
  {name: 'users.password',  path: '/accounts/password', componentName: 'UsersPasswordChange', layoutName: 'AdminLayout'},

  // Help
  {name: 'help-ticket',         path: '/accounts/tickets',             componentName: 'TicketsHome',  layoutName: 'AdminLayout'},
  {name: 'help-ticket-new',     path: '/accounts/tickets/new',         componentName: 'TicketsNew',   layoutName: 'AdminLayout'},
  {name: 'help-ticket-closed',  path: '/accounts/tickets/closed',      componentName: 'TicketClosed', layoutName: 'AdminLayout'},
  {name: 'help-ticket-summary', path: '/accounts/tickets/:_id/:slug?', componentName: 'TicketsPage',  layoutName: 'AdminLayout'},

  // admin
  {name: 'admin.courses',     path: '/admin/courses',     componentName: 'AdminCourses',  layoutName: 'AdminLayout'},
  {name: 'admin.program',     path: '/admin/program',     componentName: 'AdminPrograms', layoutName: 'AdminLayout'},
  {name: 'admin.events',      path: '/admin/events',      componentName: 'AdminOurEvents',      layoutName: 'AdminLayout'},
  // {name: 'docs-write',        path: '/accounts/docs/new', componentName: 'DocsNew',            layoutName: 'AdminLayout'},
  {name: 'admin.departments', path: '/admin/departments', componentName: 'AdminDepartments', layoutName: 'AdminLayout'},
  {name: 'admin.tickets',     path: '/admin/tickets',     componentName: 'AdminTickets',     layoutName: 'AdminLayout'},
  {name: 'admin.replies',     path: '/admin/replies',     componentName: 'AdminReplies',     layoutName: 'AdminLayout'},
  {name: 'admin.pages',       path: '/admin/pages',       componentName: 'AdminPages',       layoutName: 'AdminLayout'},
  {name: 'admin.users',       path: '/admin/users',       componentName: 'AdminUsers',       layoutName: 'AdminLayout'},
  {name: 'admin.settings',    path: '/admin/settings',    componentName: 'AdminSettings',    layoutName: 'AdminLayout'},
  {name: 'admin.testimonials',path: '/admin/testimonials',componentName: 'AdminTestimonials',layoutName: 'AdminLayout'},
  {name: 'admin.mentors',     path: '/admin/mentors',     componentName: 'AdminMentors',     layoutName: 'AdminLayout'},
  {name: 'admin.faculty',     path: '/admin/faculty',     componentName: 'AdminFaculties',   layoutName: 'AdminLayout'},
  {name: 'admin.banner',      path: '/admin/banner',      componentName: 'AdminBanner',      layoutName: 'AdminLayout'},
  {name: 'admin.enquiry',     path: '/admin/enquiry',     componentName: 'AdminEnquiry',     layoutName: 'AdminLayout'},

]);
