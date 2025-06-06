
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Resource } from "@/data/resources";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { PDFViewer } from "./PDFViewer";
import { TablePreview } from "./TablePreview";
import { ErrorBoundary } from "./ErrorBoundary";

interface ResourceModalProps {
  resource: Resource | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ResourceModal = ({ resource, isOpen, onClose }: ResourceModalProps) => {
  const { language, t } = useLanguage();

  if (!resource) return null;

  const content = resource.content[language];

  const renderPreview = () => {
    const fileType = content.fileType;
    const downloadUrl = content.downloadUrl;

    // Handle different file types
    if (fileType === 'pdf' && downloadUrl) {
      return (
        <ErrorBoundary>
          <PDFViewer pdfUrl={downloadUrl} title={content.title} />
        </ErrorBoundary>
      );
    }
    
    if (fileType === 'csv' || fileType === 'excel') {
      if (content.previewData) {
        return (
          <ErrorBoundary>
            <TablePreview data={content.previewData} />
          </ErrorBoundary>
        );
      }
      // Fallback for CSV/Excel without preview data
      return (
        <div className="text-center py-12">
          <p className="font-telegraf text-gray-600 mb-4">
            {content.description}
          </p>
          <p className="font-telegraf text-sm text-gray-500">
            Download the file to view the complete data
          </p>
        </div>
      );
    }

    // Default to markdown rendering for guides, checklists, toolkits, worksheets
    if (content.type === 'guide' || content.type === 'checklist' || content.type === 'worksheet' || content.type === 'toolkit') {
      return (
        <ErrorBoundary>
          <MarkdownRenderer resourceSlug={resource.slug} />
        </ErrorBoundary>
      );
    }

    // Fallback for other types
    return (
      <div className="prose prose-lg max-w-none markdown">
        <p className="font-telegraf text-gray-600 leading-relaxed">
          {content.description}
        </p>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-[95vw] max-h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader className="pb-4 border-b shrink-0">
          <DialogTitle className="font-telegraf font-bold text-xl sm:text-2xl text-primary line-clamp-2">
            {content.title}
          </DialogTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-3 py-1 text-sm font-telegraf bg-primary/10 text-primary rounded-full capitalize">
              {content.type}
            </span>
            {resource.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-3 py-1 text-sm font-telegraf bg-secondary/10 text-secondary rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto py-6 min-h-0">
          {renderPreview()}
        </div>
        
        <div className="pt-4 border-t bg-gray-50 -mx-6 -mb-6 px-6 py-4 shrink-0">
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
            <p className="text-sm text-gray-600 font-telegraf">
              {t('resources.modal.downloadDescription')}
            </p>
            <div className="flex gap-2 flex-wrap w-full sm:w-auto">
              {content.downloadUrl && (
                <Button 
                  asChild
                  className="bg-primary hover:bg-primary/90 text-white font-telegraf flex-1 sm:flex-none"
                >
                  <a 
                    href={content.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {t('resources.downloadTemplate')}
                  </a>
                </Button>
              )}
              {content.externalUrl && (
                <Button 
                  asChild
                  variant="outline"
                  className="font-telegraf flex-1 sm:flex-none"
                >
                  <a 
                    href={content.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {t('resources.visitExternal')}
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
