import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StudentView from '@/views/students/StudentView.vue'
import TeacherView from '@/views/teacher/TeacherView.vue'
import CourseView from '@/views/courses/CourseView.vue'
import EnrolledStudentView from '@/views/courses/EnrolledStudentView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/students',
    component: HomeView
  },
  {
    path: '/students',
    name: 'students',
    component: StudentView
  },
  {
    path: '/teachers',
    name: 'teachers',
    component: TeacherView
  },
  {
    path: '/courses',
    name: 'courses',
    component: CourseView
  },
  {
    path: '/course/:id/students',
    name: 'courseStudents',
    component: EnrolledStudentView,
    meta: { requiresAuth: true, role: ['admin','veterinario'] } 
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
