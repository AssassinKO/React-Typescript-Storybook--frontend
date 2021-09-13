export default function handler(req, res) {
  res.status(200).json({
    name: 'Finestra',
    info: {
      startDate: '01/05/1989',
      employees: '24',
      governmentNumber: '123456789',
    },
    labels: [
      {
        title: 'Familiebedrijf',
      },
      {
        title: 'Toonzaal',
      },
      {
        title: 'Meewerkend patroon',
      },
      {
        title: 'Budgetvriendelijk',
      },
      {
        title: 'Bijdrager tot Groen bouwen',
      },
      {
        title: 'Lokaal bedrijf',
      },
      {
        title: 'Nationaal actief',
      },
    ],
    description:
      '<h4>Lorum ipsum dolor sit amet</h4><p>Curabitur blandit tempus porttitor. Duis mollis, est non commodo luctus, <strong>nisi erat porttitor ligula</strong>, eget lacinia odio sem nec elit. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean lacinia bibendum nulla sed consectetur. Maecenas faucibus mollis interdum. Cras mattis consectetur purus sit amet fermentum.</p><p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Nulla vitae elit libero, a pharetra augue. Donec sed odio dui. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Nullam quis risus eget urna mollis ornare vel eu leo. Donec id elit non mi porta gravida at eget metus.\n' +
      'Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Vestibulum id ligula porta felis euismod semper. Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas faucibus mollis interdum.</p>',
    certificates: [
      {
        title: 'ISO 9001',
      },
      {
        title: 'ISO 14001 Milieu',
      },
      {
        title: 'ISO 9001',
      },
    ],
    specializations: [
      {
        label: 'Buitenschrijnwerk',
        sub: ['Garagepoorten', 'PVC ramen en deuren'],
      },
      {
        label: 'Rolluiken & Zonwering',
      },
      {
        label: 'Water & Wellness',
      },
      {
        label: 'Interieur & Binnenafwerking',
        sub: ['Kachels en haarden', 'Schilderwerken'],
      },
      {
        label: 'Parket vloeren',
      },
    ],
  });
}
