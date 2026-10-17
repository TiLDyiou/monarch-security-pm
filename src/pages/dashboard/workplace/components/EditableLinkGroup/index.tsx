import React from 'react';
import { Link } from 'react-router-dom';
import useStyles from './index.style';

export type EditableLink = {
  title: string;
  href: string;
  id?: string;
};

type EditableLinkGroupProps = {
  links: EditableLink[];
};

const EditableLinkGroup: React.FC<EditableLinkGroupProps> = ({ links = [] }) => {
  const { styles } = useStyles();
  return (
    <div className={styles.linkGroup}>
      {links.map((link) => (
        <Link key={link.id || link.title} to={link.href}>
          {link.title}
        </Link>
      ))}
    </div>
  );
};

export default EditableLinkGroup;
