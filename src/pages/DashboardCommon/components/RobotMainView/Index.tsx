import classNames from "classnames";
import React from "react";
// import BatchUpload from '@/components/Upload/Index';
import type { ImageProps } from "./Image";
import Image from "./Image";
// import uploadHintImg from '@/assets/images/pic_upload_img@2x.png';
// import Empty from '@/components/Empty/Index';
import DraggerUpload from "@/components/DragUpload";
import type { ConnectState } from "@/models/connect";
import useMount from "ahooks/lib/useMount";
import { Spin } from "antd";
import type { Dispatch } from "umi";
import { connect, useSelector } from "umi";
import { beforeUpload, formatListContainer } from "../RobotLeftView/store/useFormatList";
import Scanning, { wrapperStyle } from "../Scanning";
import styles from "./Index.less";
import { mockRecognize } from "@/mock/recongnize";
export interface IFile {
  id?: string | number;
  name?: string;
  status: "upload" | "recognize" | "wait" | "complete" | {};
  isExample?: boolean;
  imageData?: any;
  url: string;
  result?: any;
  isPDF?: boolean;
}
export interface MainViewProps extends Omit<ImageProps, "src"> {
  currentFile: IFile;
  onUpload: (files: any) => void;
  Common: ConnectState["Common"];
  Robot: ConnectState["Robot"];
  dispatch: Dispatch;
}

export const fallback =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg==";

export const EmptyView: React.FC<{ onUpload: MainViewProps["onUpload"] }> = ({
  onUpload,
}) => {
  const { acceptInfo } = useSelector((state: ConnectState) => state.Robot);
  return (
    <div className={classNames(styles.mainViewUpload, "empty-view")}>
      {/* <Empty src={uploadHintImg} desc="支持单张或批量上传" />
      <BatchUpload onUpload={onUpload} /> */}
      <DraggerUpload
        accept={acceptInfo?.accept}
        acceptDesc={acceptInfo?.desc}
        onUpload={onUpload}
      />
    </div>
  );
};
export const MainView: React.FC<MainViewProps> = ({
  currentFile,
  onUpload,
  Common,
  Robot,
  ...props
}) => {
  const { resultLoading, loading } = Common;
  const { acceptInfo } = Robot;

  const beforeUploadHandle = (fileList: any[]) => {
    const result = beforeUpload(fileList, acceptInfo);
    if (!result.length) return;
    onUpload?.(result);
  };

  return (
    <div className={styles.fileView} style={wrapperStyle}>
      {currentFile.name && (
        <div className={styles.fileName}>{currentFile.name}</div>
      )}

      {loading && (
        <div className={styles.loadingWrap}>
          <Spin />
        </div>
      )}
      <Scanning visible={!loading && resultLoading} />

      {/* 居中上传 */}
      {/* {!currentFile.url && isNil(currentFile.id) ? (
        <EmptyView onUpload={beforeUploadHandle} />
      ) : (
        <GlobalDragUpload onUpload={beforeUploadHandle} />
      )} */}
      {currentFile.url && (
        <Image
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
          }}
          key={currentFile.url}
          wrapperClassName={classNames(styles.fileBox, "no-select")}
          src={loading ? undefined : currentFile.url}
          fallback={fallback}
          currentFile={currentFile}
          {...props}
        />
      )}
    </div>
  );
};
export default connect((state: ConnectState) => state)(MainView);

interface ImageMainViewProps extends Omit<ImageProps, "src"> {
  file: IFile;
}
export const ImageMainView: React.FC<ImageMainViewProps> = ({
  file,
  ...props
}) => {
  return (
    <div className={styles.fileView}>
      <div className={styles.fileName}>{file.name}</div>
      <Image
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
        }}
        key={file.url}
        wrapperClassName={classNames(styles.fileBox, "no-select")}
        src={file.url}
        fallback={fallback}
        {...props}
      />
    </div>
  );
};
