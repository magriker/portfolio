export type Product = {
  id?: number;
  created_at?: string;
  name: string;
  main_img_url: string;
  sub1_img_url: string;
  sub2_img_url: string;
  sub3_img_url: string;
  category: string;
  order?: number;
  description: string;
  updated_at?: string;
};

export type ImageFileType = {
  fileName: string;
  file: File;
};

export type CustomModalProps = {
  toggleModal: () => void;
  refreshAdmin: () => void;
};

export type ModalProps = {
  product: Product;
} & CustomModalProps;
