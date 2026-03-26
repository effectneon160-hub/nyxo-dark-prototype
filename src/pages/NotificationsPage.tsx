import React from 'react';
import { useNYXOStore } from '../store';
import { Bell, CheckCircle2, AlertTriangle, Info, XCircle } from 'lucide-react';
export function NotificationsPage() {
  const { notifications, markNotificationRead } = useNYXOStore();
  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-danger" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-info" />;
    }
  };
  const getBorder = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-l-success';
      case 'warning':
        return 'border-l-warning';
      case 'error':
        return 'border-l-danger';
      case 'info':
      default:
        return 'border-l-info';
    }
  };
  return (
    <div className="p-8 max-w-[800px] mx-auto space-y-8 pb-24">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary mb-2 flex items-center">
            <Bell className="w-8 h-8 mr-3 text-text-muted" />
            Notifications
          </h1>
          <p className="text-text-secondary text-sm">
            System alerts, approvals, and agent updates.
          </p>
        </div>
        <button
          onClick={() => {
            notifications.forEach((n) => markNotificationRead(n.id));
          }}
          className="text-sm text-cyan hover:text-cyan-hover font-medium transition-colors">
          
          Mark all as read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.length > 0 ?
        notifications.map((notif) =>
        <div
          key={notif.id}
          onClick={() => markNotificationRead(notif.id)}
          className={`bg-surface border border-subtle border-l-4 rounded-lg p-4 flex items-start space-x-4 cursor-pointer hover:bg-surface-hover transition-colors ${getBorder(notif.type)} ${!notif.read ? 'bg-elevated' : 'opacity-70'}`}>
          
              <div className="mt-0.5 shrink-0">{getIcon(notif.type)}</div>
              <div className="flex-1">
                <p
              className={`text-sm ${!notif.read ? 'text-text-primary font-medium' : 'text-text-secondary'}`}>
              
                  {notif.message}
                </p>
                <div className="text-xs text-text-muted mt-1 font-mono">
                  {new Date(notif.timestamp).toLocaleString()}
                </div>
              </div>
              {!notif.read &&
          <div className="w-2 h-2 rounded-full bg-cyan shrink-0 mt-1.5" />
          }
            </div>
        ) :

        <div className="bg-surface border border-subtle rounded-lg p-12 flex flex-col items-center justify-center text-center">
            <Bell className="w-12 h-12 text-text-disabled mb-4" />
            <h3 className="text-lg font-bold text-text-primary mb-2">
              No notifications
            </h3>
            <p className="text-sm text-text-secondary">
              You're all caught up. NYXO will alert you here when needed.
            </p>
          </div>
        }
      </div>
    </div>);

}