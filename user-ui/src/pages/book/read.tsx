import { PdfViewer } from '@/components/pdf-viewer';

export const BookRead = () => {
    return (
        <div className="h-[calc(100vh-69px)]">
            <PdfViewer url="https://hcm.ss.bfcplatform.vn/prj301/prj301/pdfs/IoT102T_Final_Report.pdf" />
        </div>
    );
};
