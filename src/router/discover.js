import Home from '@/views/discover/home'


export default{
  path: '/discover',
  component: Home,
  redirect: '/discover',
  children: [
    {
      path: '',
      component: Home
    },
    {
      path: 'toplist',
      component: Home
    },
    {
      path: 'playlist',
      component: Home
    },
    {
      path: 'djradio',
      component: Home
    },
    {
      path: 'artist',
      component: Home
    },
    {
      path: 'album',
      component: Home
    }
  ]
}