import type { GetServerSideProps, NextPage } from 'next';
import { prisma } from '../../lib/prisma';
import { FabricGallery } from '../../components/sections/FabricGallery';

interface FabricsPageProps {
  fabrics: any[];
}

const FabricsPage: NextPage<FabricsPageProps> = ({ fabrics }) => {
  return (
    <main>
      <FabricGallery initialFabrics={fabrics} />
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const fabrics = await prisma.sustainableFabric.findMany({
    include: {
      products: {
        take: 4,
        orderBy: {
          createdAt: 'desc',
        },
      },
      aiSuggestions: {
        take: 1,
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  return {
    props: {
      fabrics: JSON.parse(JSON.stringify(fabrics)),
    },
  };
};

export default FabricsPage;