import React, { useEffect, useRef } from "react";

// Same embedded approach as the influencer's host view, but joins with
// role 0 (attendee/viewer). Renders fully inside our own page.
const ZoomViewerEmbed = ({ meetingConfig, displayName }) => {
  const containerRef = useRef(null);
  const clientRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const joinMeeting = async () => {
      const { default: ZoomMtgEmbedded } = await import("@zoom/meetingsdk/embedded");

      await import("@zoom/meetingsdk/dist/css/bootstrap.css");
      await import("@zoom/meetingsdk/dist/css/react-select.css");

      const client = ZoomMtgEmbedded.createClient();
      clientRef.current = client;

      if (!isMounted || !containerRef.current) return;

      await client.init({
        zoomAppRoot: containerRef.current,
        language: "en-US",
        patchJsMedia: true,
        customize: {
          video: {
            isResizable: true,
            viewSizes: {
              default: { width: containerRef.current.offsetWidth, height: 600 },
            },
          },
        },
      });

      await client.join({
        sdkKey: meetingConfig.sdkKey,
        signature: meetingConfig.signature,
        meetingNumber: meetingConfig.meetingNumber,
        password: meetingConfig.password,
        userName: displayName || "Viewer",
      });
    };

    joinMeeting().catch((err) => {
      console.error("Failed to join live stream:", err);
    });

    return () => {
      isMounted = false;
      if (clientRef.current) {
        clientRef.current.leaveMeeting().catch(() => {});
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetingConfig]);

  return (
    <div className="w-full rounded-2xl overflow-visible bg-black" style={{ minHeight: 600 }}>
      <div
        ref={containerRef}
        id="zmmtg-root-container"
        className="w-full"
        style={{ position: "relative", minHeight: 600 }}
      />
    </div>
  );
};

export default ZoomViewerEmbed;