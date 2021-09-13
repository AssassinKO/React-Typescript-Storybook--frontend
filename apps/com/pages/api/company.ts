export default function handler(req, res) {
  res.status(200).json({
    name: 'insight-in',
    location: 'Brussel',
    tags: [
      'React',
      'Laravel',
      'PHP Development',
      'Symfony',
      'Vuejs',
      'Node.js',
      'JavaScript Development',
    ],
    logo: 'https://insight-in.be/wp-content/uploads/2019/04/origineel.jpg',
  });
}
