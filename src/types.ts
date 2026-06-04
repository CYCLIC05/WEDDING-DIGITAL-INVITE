/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RSVP {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  events: string[];
  dietary_notes?: string;
  status: 'pending' | 'approved' | 'declined';
}

export interface RSVPResponse {
  success: boolean;
  data?: RSVP;
  error?: string;
  isEmailSent?: boolean;
  resendId?: string;
  simulatedEmailCode?: string;
  simulatedEmailHtml?: string;
}

export interface RRSVPListResponse {
  success: boolean;
  data: RSVP[];
}
